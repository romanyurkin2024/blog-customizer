import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect, SetStateAction, Dispatch } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType,
	setCurrentArticleState: Dispatch<SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (
	{currentArticleState, setCurrentArticleState} : ArticleParamsFormProps
) => {

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] = useState<ArticleStateType>(currentArticleState);


	const toggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	}

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({...selectArticleState, [key]: value});
	}

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef,
		onChange: setIsSidebarOpen
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside ref={rootRef} className={clsx(styles.container, isSidebarOpen && styles.container_open)}>
				<form className={styles.form}
					  onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState);
					  }}
					  onReset={(e) => {
						e.preventDefault();
						setCurrentArticleState(defaultArticleState);
					  }}>
					<Text as='h2' size={31} weight={800} uppercase>Задайте параметры</Text>
					<Select selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							title="Шрифт"
					  		onChange = {(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
							name='font-size__button'
							selected={selectArticleState.fontSizeOption}
							options={fontSizeOptions}
							title="Размер шрифта"
					  		onChange = {(option) => handleChange('fontSizeOption', option)}
					/>
					<Select selected={selectArticleState.fontColor}
							options={fontColors}
							title="Цвет шрифта"
					  		onChange = {(option) => handleChange('fontColor', option)} />

					<Separator />

					<Select selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							title="Цвет фона"
					  		onChange = {(option) => handleChange('backgroundColor', option)}  />
					<Select selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							title="Ширина контента"
					  		onChange = {(option) => handleChange('contentWidth', option)} />


					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
