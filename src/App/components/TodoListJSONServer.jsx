import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TodoList.module.css';

export const TodoListJsonServer = () => {
	const [inputValue, setInputValue] = useState(''); // Состояние для ввода
	const [todoList, setTodoList] = useState([]); // Список добавленных задач
	const [allTodos, setAllTodos] = useState([]); // Все задачи, загруженные с сервера
	const [isLoading, setIsLoading] = useState(false); // Стейт для загрузки
	const [currentTodoIndex, setCurrentTodoIndex] = useState(0); // Индекс текущей задачи для добавления
	const [isSorted, setIsSorted] = useState(false); // Стейт для включения сортировки
	const [isActive, setIsActive] = useState(false);

	// Загружаем данные с сервера при монтировании компонента
	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3000/todos')
			.then((response) => response.json())
			.then((data) => {
				setAllTodos(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	// Функция для добавления задачи по одному из массива
	const addTodoById = () => {
		if (currentTodoIndex < allTodos.length) {
			const todoToAdd = allTodos[currentTodoIndex];
			setTodoList((prevList) => [...prevList, todoToAdd]);
			setCurrentTodoIndex((prevIndex) => prevIndex + 1);
			if (currentTodoIndex + 1 === allTodos.length) {
				console.log('Все задачи были добавлены!');
			}
		}
	};

	// Функция для переключения сортировки
	const toggleSort = () => {
		setIsSorted((prevState) => !prevState);
	};

	// Функция для сортировки задач по алфавиту
	const sortedTodos = isSorted
		? [...todoList].sort((a, b) => a.title.localeCompare(b.title))
		: todoList;

	const handleClick = (event) => {
		// ️ toggle isActive state on click
		setIsActive((current) => !current);
	};

	return (
		<div className={styles.app}>
			<h2>Todolist JSON Server</h2>
			{/* Кнопка для добавления задачи из массива по ID */}
			<button onClick={addTodoById} className={styles.addButton}>
				Добавить задачу
			</button>
			{/* Кнопка для включения/выключения сортировки */}
			<button onClick={toggleSort} className={styles.sortButton}>
				{isSorted ? 'Отключить сортировку' : 'Включить сортировку'}
			</button>
			{/* Поле для поиска задач */}
			<input
				type="text"
				className="control"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)} // Управление состоянием ввода
			/>
			{/* Отображаем состояние загрузки или список задач */}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.taskList}>
					{sortedTodos
						.filter(
							(todo) =>
								todo.title
									.toLowerCase()
									.includes(inputValue.toLowerCase()), // Фильтрация по введенному тексту
						)
						.map(({ id, title }) => (
							<Link
								key={id}
								to={`/React-TodoList-App/task/${id}`}
								className={styles.todoItem}
								// className={`${styles.todoItem} ${styles.todoItem}`}
							>
								<>
									<span
										onClick={handleClick}
										className={styles.firstSpan}
										// className={isActive ? 'active' : 'mo'}
									>
										{title}
									</span>
								</>
							</Link>
						))}
				</div>
			)}
		</div>
	);
};
