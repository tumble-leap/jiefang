import { useState, useEffect } from 'react';
import pic from './assets/images/run.gif';
import './App.css';

const days: string[] = ['8.30','9.21', '9.22', '9.23', '9.26', '9.27', '9.28', '9.29'];

function calcLeftWorkDays(): number {
    let count = 0;
    const today = new Date().getDate(); // 获取今天的日期（天数）

    for (const day of days) {
        const month = parseInt(day.split('.')[0]); // 获取月份
        const dayNumber = parseInt(day.split('.')[1]); // 获取日期（天数）
        if (month > new Date().getMonth()+1) {
            count++;
        } else if (month < new Date().getMonth()+1) {
            continue;
        } else if (dayNumber > today) {
            count++;
        } else if (dayNumber === today) {
            if (new Date().getHours() < 21) {
                count++;
            }
        }
    }

    return count;
}

const targetDate: Date = new Date('2024-09-29T21:00:00');

function calcLeftDays(): [string, boolean] {
    const now: Date = new Date();
    const timeDifference: number = targetDate.getTime() - now.getTime();
    if (timeDifference <= 0) {
        return ["", true];
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return [`${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`, false];

}

function App() {

    const [leftWorkDays, setLeftWorkDays] = useState(0);
    const [leftDays, setLeftDays] = useState('');

    useEffect(() => {
        const interval1 = setInterval(() => {
            const [daysString, isEnd] = calcLeftDays();
            if (isEnd) {
                clearInterval(interval1);
                setLeftDays("0")
                return
            }
            setLeftDays(daysString);
        }, 1000);

        const days = calcLeftWorkDays();
        setLeftWorkDays(days);
        const interval2 = setInterval(() => {
            const days = calcLeftWorkDays();
            setLeftWorkDays(days);
        }, 1000*60*60);

        return ()=> {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    return (
        <div id="app">
            <div id="image-container">
                <img id='pic' src={pic} alt="Image" />
            </div>
            <h1>还需要上 {leftWorkDays} 天班</h1>
            <h2>距离 run 还有 {leftDays}</h2>
        </div>
    )
}

export default App
