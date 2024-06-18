import React from 'react'

import { BarChart, Bar} from 'recharts';


function StatistikaTerminiMupChart() {
    const termini = JSON.parse(localStorage.getItem('mup')).termini;
    const data = [
        {
            name: 'Zahtevi', uv: termini.filter(termin => termin.status.status === 'Zahtev').length, pv: 2400, amt: 2400,
        },
        {
            name: 'Zakazani', uv: termini.filter(termin => termin.status.status === 'Zakazan').length, pv: 2400, amt: 2400,
        },
        {

            name: 'Odbijeni', uv: termini.filter(termin => termin.status.status === 'Odbijen').length, pv: 2400, amt: 2400,
        },
    ];

  return (
    <div className='statistikaTerminiMupChart'>
        <BarChart

            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}

        >
            <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
    </div>
    
  )
}

export default StatistikaTerminiMupChart