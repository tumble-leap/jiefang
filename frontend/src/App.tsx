import { useState, useEffect } from 'react';
import pic from './assets/images/run.gif';
import './App.css';

const days: number[] = [6, 7, 8, 9, 12, 13, 14, 15, 16, 20, 21, 22, 23, 26, 27, 28, 29];

function calcLeftWorkDays(): number {
    let count = 0;
    const today = new Date().getDate(); // 获取今天的日期（天数）

    for (const day of days) {
        if (day >= today) {
            count++;
        }
    }

    return count;
}

// 目标时间 2024 年 9 月 30 日 21:00:00
const targetDate: Date = new Date('2024-09-29T21:00:00');

function calcLeftDays(): [string, boolean] {
    const now: Date = new Date();
    const timeDifference: number = targetDate.getTime() - now.getTime();
    if (timeDifference <= 0) {
        return ["", false]; // 返回剩余天数为 0
    }

    // 计算天、小时、分钟、秒
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return [`${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`, true];

}

function App() {

    const [leftWorkDays, setLeftWorkDays] = useState(0);
    const [leftDays, setLeftDays] = useState('');

    useEffect(() => {




        // 创建一个定时器，每秒更新一次数据
        const interval = setInterval(() => {
            // 计算剩余工作天数
            const days = calcLeftWorkDays();
            setLeftWorkDays(days);
            // 计算剩余总天数
            const [daysString, isEnd] = calcLeftDays();
            if (isEnd) {
                clearInterval(interval);
                setLeftDays("0")
                return
            }
            setLeftDays(daysString);
        }, 1000);

        // 在组件卸载时清理定时器
        return () => clearInterval(interval);
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
