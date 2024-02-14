import React, { useState } from 'react';
import axios from 'axios';

function RequestForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://lana-support.onrender.com/api/submitRequest', { name, phone,contact, description, address });
            alert('Заявка успешно отправлена!');
        } catch (error) {
            console.error('Ошибка при отправке заявки:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Наименование оборудования:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Контакты:
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </label>
            <br/>
            <label>
                Контактное лицо:
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}/>
            </label>
            <br/>
            <label>
                Описание:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <br/>
            <label>
                Адрес:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
            </label>
            <br/>
            <button type="submit">Отправить заявку</button>
        </form>
    );
}

export default RequestForm;
