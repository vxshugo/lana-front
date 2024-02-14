import React, {useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
export default function Admin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [requests, setRequests] = useState([]);
    const handleLogin = () => {
        // Ваша логика аутентификации здесь (например, сравнение с базой данных или API)
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
            // Сохранение информации о сессии в локальное хранилище
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            alert('Неверные учетные данные');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        // Удаление информации о сессии из локального хранилища
        localStorage.removeItem('isLoggedIn');
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('https://lana-support.onrender.com/api/admin/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleStatusChange = async (id) => {
        try {
            await axios.put(`https://lana-support.onrender.com/api/admin/requests/${id}`);
            // Обновить состояние заявок после изменения статуса
            const updatedRequests = requests.map(request =>
                request._id === id ? { ...request, status: true } : request
            );
            setRequests(updatedRequests);
        } catch (error) {
            console.error('Ошибка при изменении статуса:', error);
        }
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Вы вошли в систему!</p>
                    <div className="review-card">
                        <h2>Заявки администратора</h2>
                        <ul>
                            {requests.map(request => (
                                <li key={request._id} className={request.status === false ? "orange" : "green"}>
                                    Наименование оборудования<strong>{request.name}</strong> Контактный номер: ({request.phone})
                                    <br/>Котактное лицо: {request.description}
                                    <br/>Описание проблемы: {request.description}
                                    <br/>Адрес заявителя: {request.address}

                                    {!request.status && (
                                        <button className="button_status" onClick={() => handleStatusChange(request._id)}>
                                            Изменить статус
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div>
                    <label>
                        Имя пользователя:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Пароль:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button onClick={handleLogin}>Войти</button>
                </div>
            )}
        </div>
    )
}