import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {


  const [music, setMusic] = useState([]);
  const [searchItem,setSearchItem]=useState("");
  const [item, setItem] = useState({ title: "", singer: "" });

  const [editItem, setEditItem] = useState({ id:"",title: "", singer: "" });

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setItem(prev => ({ ...prev, [name]: value }));
  }

  const handleDefaultGet = () => {
    axios.get("http://10.5.5.11/music").then(resp => {
      console.log(resp);

      setMusic(resp.data);
    })
  }
  const handleAdd = () => {
    //데이터를 보낼 때는 post를 쓴다.
    axios.post("http://10.5.5.11/music", item);
    setItem({title:"",singer:""})
  }

  const [delId, setDelId] = useState("");
  const handleDelIdChange = (e) => {
    setDelId(e.target.value);
  }

  const handleDel = () => {
    //데이터를 보낼 때는 post를 쓴다.
    axios.delete(`http://10.5.5.11/music/${delId}`);
    setDelId("");
  }

const handleEditItemChange = (e) => {
    const { name, value } = e.target;

    setEditItem(prev => ({ ...prev, [name]: value }));
  }
  const handleUpdate = () => {
    axios.put(`http://10.5.5.11/music/${editItem.id}`,editItem);
    setEditItem({id:"",title:"",singer:""});
  }

const handleSearch = () => {
  axios.get(`http://10.5.5.11/music?title=${searchItem}`)
    .then(resp => {
      console.log(resp);
      setMusic(resp.data); // 검색 결과를 music에 반영하는게 자연스러움
      setSearchItem("");   // 입력창 초기화
    })
    .catch(err => {
      console.error("검색 에러:", err);
    });
}


  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Singer</th>
          </tr>

        </thead>
        <tbody>
          {music.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.title}</td>
                <td>{e.singer}</td>
              </tr>);
          })}
        </tbody>
      </table>
      <button onClick={handleDefaultGet}>1. 가져오기</button>
      <hr></hr>
      <input type="text" name='title' placeholder='input title' onChange={handleItemChange} value={item.title} /><br></br>
      <input type="text" name='singer' placeholder='input singer' onChange={handleItemChange} value={item.singer} />
      <button onClick={handleAdd}>데이터 등록</button>
      <hr></hr>
      <input type="text" placeholder='input id to delete' onChange={handleDelIdChange} value={delId} />
      <button onClick={handleDel}>데이터 삭제</button>
      <hr></hr>
      <input type="text" name='id' placeholder='input id' onChange={handleEditItemChange} value={editItem.id} /><br></br>
      <input type="text" name='title' placeholder='input title' onChange={handleEditItemChange} value={editItem.title} /><br></br>
      <input type="text" name='singer' placeholder='input singer' onChange={handleEditItemChange} value={editItem.singer} />
      <button onClick={handleUpdate}>데이터 등록</button>
      <hr></hr>
	<input type="text" placeholder="input title to search " onChange={(e)=>{setSearchItem(e.target.value);}} value={searchItem}></input> 
  <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default App;
