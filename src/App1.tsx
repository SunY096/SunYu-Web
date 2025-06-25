import { Select } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';

// 表格样式
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  border: '1px solid #d9d9d9',
};

// 单元格样式
const cellStyle = {
  border: '1px solid #d9d9d9',
  padding: '8px 12px',
  textAlign: 'left' as const,
};

// 原始数据
const originalData = [
  { name: 'Jack', age: 28, gender: '男' },
  { name: 'Lucy', age: 24, gender: '女' },
  { name: 'Tom', age: 32, gender: '男' },
  { name: 'Lily', age: 22, gender: '女' },
  { name: 'Mike', age: 30, gender: '男' },
];

const App= () => {
  const [filteredData, setFilteredData] = useState(originalData);

  const handleChange = (value: string) => {
    if(value === 'all'){
      setFilteredData(originalData)
    }else{
      const filered = originalData.filter(item=>item.name.toLowerCase().includes(value.toLocaleLowerCase()))
      setFilteredData(filered)
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <Select
        showSearch
        placeholder="选择人员"
        optionFilterProp="children"
        onChange={handleChange}
        onSearch={handleChange}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          { value: 'all', label: '全部人员' },
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'tom', label: 'Tom' },
          { value: 'lily', label: 'Lily' },
          { value: 'mike', label: 'Mike' },
        ]}
        style={{ width: '200px' }}
      />
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>姓名</th> 
            <th style={cellStyle}>年龄</th>
            <th style={cellStyle}>性别</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person, index) => (
            <tr key={index}>
              <td style={cellStyle}>{person.name}</td>
              <td style={cellStyle}>{person.age}</td>
              <td style={cellStyle}>{person.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;