import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text'

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	stateForm: (formState: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ stateForm }: ArticleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const [selectArticleState, setselectArticleState] = useState<ArticleStateType>(defaultArticleState)

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setselectArticleState({ ...selectArticleState, [key]: value })
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)} >
				<form className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						stateForm(selectArticleState)
					}}
					onReset={(e) => {
						e.preventDefault();
						stateForm(defaultArticleState)
					}}>
					<Text
						weight={800}
						uppercase
						as={'h3'}
						size={31}
					>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => { handleChange('fontFamilyOption', option) }}

					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'Размер шрифта'}
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => { handleChange('fontSizeOption', option) }}
					/>
					<Select
						title='цвет шрифта'
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) => { handleChange('fontColor', option) }}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => { handleChange('backgroundColor', option) }}
					/>
					<Select
						title='ширина контента'
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => { handleChange('contentWidth', option) }}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
