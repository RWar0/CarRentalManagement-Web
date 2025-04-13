import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { IRentalChart } from '../../interfaces/IRental';
import { ApiService } from '../../classes/ApiService';


Chart.register(CategoryScale);

function getSuggestedHeight(data: { quantity: number }[]) {
    return Math.max(...data.map(({ quantity }) => quantity)) + 1;
}

const RentedCardChart = () => {
    const apiService = new ApiService('Rental Chart');

    const [dataFromDb, setDataFromDb] = useState<IRentalChart[]>([]);

    async function fetchData() {
        try {
            setDataFromDb(await apiService.get<IRentalChart[]>('/Rentals/RentalChartData'));
        }
        catch {}
    }

    useEffect(() => {
        fetchData();
    }, []);

    const allMonths = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' }));

    const currentMonthIndex = new Date().getMonth();

    const monthData: (number | null)[] = Array.from({ length: 12 }, () => null);
    dataFromDb.forEach(({ month, quantity }) => {
        if (month >= 1 && month <= 12) {
            monthData[month - 1] = quantity;
        }
    });

    const chartData = {
        labels: allMonths,
        datasets: [
            {
                label: 'Quantity in specific month',
                data: monthData.map((quantity, index) => index <= currentMonthIndex ? quantity : null),
                borderColor: '#0095ff',
                backgroundColor: 'rgba(79, 126, 198, 0.15)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const },
            title: { display: false },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    position: 'bottom',
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax: getSuggestedHeight(dataFromDb),
                title: {
                    display: true,
                    text: 'Quantity',
                },
            },
        },
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', maxWidth: '950px', margin: '10px auto' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default RentedCardChart;
