import React, { useState } from 'react'
import { TimePicker, Select, Cascader, Input } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import 'antd/dist/antd.css'






export default function App() {
    const [time, setTime] = useState('')
    const onChange = (time: Moment, timeString: string) => {
        setTime(timeString)
    };
    const [select, setSelect] = useState('')
    const onChange1 = (value: string) => {
        setSelect(value)
    };
    const [cas, serCas] = useState<string[]>([]);
    const onChange2 = (value: string[]) => {
        serCas(value)
    };

    const [input, setIn] = useState('')
    const Inchange = (event) => {
        setIn(event.target.value)
    }
    const clearAll = () => {
        setTime('');
        setSelect('');
        serCas([]);
        setIn('');
    }
    const handleAll = () => {
        const formData = {
            time: time || undefined,
            select: select || undefined,
            cascader: cas.length > 0 ? cas : undefined,
            input: input || undefined
        };
        const formatData = (obj) => {
                    //    内置函数  将拿到的东西转化为数组存储键值对
            return Object.entries(obj)
                .map(([key, value]) => {
                    const valStr = value === undefined ? 'undefined' : JSON.stringify(value);
                    return `${key}: ${valStr}`;
                })
        };

            alert(`表单数据:\n${formatData(formData)}`);
    }
    return (
        <div>
            <TimePicker value={time ? moment(time, 'HH:mm:ss') : null} onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            <br />
            <Select
                style={{ width: '100px' }}
                value={select}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange1}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                ]}
            />
            <br />
            <Cascader value={cas} options={options} onChange={onChange2} placeholder="Please select" />

            <br /><Input value={input} onChange={Inchange} placeholder="Basic usage" style={{ width: '300px' }} />
            <button onClick={clearAll}>清除</button>
            <button onClick={handleAll}>提交</button>
        </div>
    )

}
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

