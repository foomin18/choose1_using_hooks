import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots'; //複数のexportは{}でデストラクトする
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

function App() {
    // constructor() {
    //     super(); //App component 呼び出し
    //     this.state = { //App の状態
    //         robots: [],
    //         searchfield: ''
    //     }
    // }
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    // componentDidMount() { //サーバーからfetchして、受け取ったモノをrobotsに代入
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({ robots: users }));
    // }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setRobots(users));
    }, []) //componentDidMountと同じ

    useEffect(() => {
        console.log(count);
    }, [count])

    //classのmethodではなく関数の中の要素なのでconstがいる
    const onSearchChange = (event) => { //入力をstateのsearchfieldにいれる
        setSearchfield(event.target.value);
    }

    //const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => { 
        return robot.name.toLowerCase().includes(searchfield.toLowerCase()); //配列内で条件に合う要素の配列を返す
    })

    if (robots === 0) { //fetchに時間がかかってるとき
        return (<h1 className='tc'>Now on loading...</h1>);
    } else {
        return (
            <div className='tc'>
                <h1 className='f2'>ROBOFRIENDS</h1>
                <button onClick={() => setCount(count + 1)}>click Me</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll> {/*他のcomponentをwrapするcomponent props.childrenとしてwrapしてるcomponentを持つ */}
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} /> {/* CardListarrow関数にrobotsで渡してる*/}
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }

}

export default App;
