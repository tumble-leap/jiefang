import { useState, useEffect } from 'react';
import pic from './assets/images/run.gif';
import './App.css';

function App() {
    const days: number[] = [6, 7, 8, 9, 12, 13, 14, 15, 16, 20, 21, 22, 23, 26, 27, 28, 29];

    function calcDays(): number {
        let count = 0;
        const today = new Date().getDate(); // 获取今天的日期（天数）

        for (const day of days) {
            if (day >= today) {
                count++;
            }
        }

        return count;
    }
    const [leftDays, setLeftDays] = useState(0);
    const [data, setData] = useState(''); 

    useEffect(() => {
        const days = calcDays();
        setLeftDays(days);

        // 目标时间 2024 年 9 月 30 日 21:00:00
        const targetDate: Date = new Date('2024-09-29T21:00:00');

        // 创建一个定时器，每秒更新一次数据
        const interval = setInterval(() => {
            const now: Date = new Date();
            const timeDifference: number = targetDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                clearInterval(interval); // 如果目标时间已到，停止计时器
                return;
            }

            // 计算天、小时、分钟、秒
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            setData(`${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`);
        }, 1000);

        // 在组件卸载时清理定时器
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="app">
            <div id="image-container">
                <img id='pic' src={pic} alt="Image" />
            </div>
            <h1>还需要上 {leftDays} 天班</h1>
            <h2>距离 run 还有 {data}</h2>
        </div>
    )
}

export default App
