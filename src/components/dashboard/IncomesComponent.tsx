import React, { useCallback, useEffect, useState } from 'react'
import { ApiService } from '../../classes/ApiService';

const IncomesComponent = () => {
  const apiService = new ApiService('Incomes');

  const [currentIncomes, setCurrentIncomes] = useState<number | null>(null);
  const [previousIncomes, setPreviousIncomes] = useState<number | null>(null);
  const [incomeRate, setIncomeRate] = useState<number | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [current, previous] = await Promise.all([
        apiService.get<number>('/Payments/CurrentIncomes'),
        apiService.get<number>('/Payments/PreviousIncomes'),
      ]);
      setCurrentIncomes(current);
      setPreviousIncomes(previous);
    }
    catch { }
  }, []);


  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (previousIncomes !== null && previousIncomes !== -1 && currentIncomes !== null) {
      let rate = ((currentIncomes - previousIncomes) / previousIncomes) * 100;
      setIncomeRate(parseFloat(rate.toFixed(2)));
    }
    else {
      setIncomeRate(0);
    }
  }, [currentIncomes, previousIncomes]);

  return (
    <div className="container-fluid m-0 p-0 pb-3">
      <h2 className='text-center pt-5 fw-bold' style={{ color: 'var(--additionalColor4)' }}>{currentIncomes ?? "N/A"}<span className='text-black-50 fw-semibold'> $</span></h2>
      <div className={`d-flex justify-content-center pt-2 text-${incomeRate && (incomeRate > 0 ? 'success' : incomeRate < 0 ? 'danger' : 'black-50')}`} >
        {incomeRate !== 0 && (
          <span className="material-symbols-outlined fs-3">
            {incomeRate && incomeRate > 0 ? 'trending_up' : 'trending_down'}
          </span>
        )}
        <h5 className='ps-2'>{incomeRate ?? "N/A"}%</h5>
      </div>
      <p className='text-center m-0 p-0 pt-2 text-black-50'>Incomes from previous month:</p>
      <p className='text-center fs-5 fw-medium text-black-50'>{previousIncomes}$</p>

    </div>
  )
}

export default IncomesComponent