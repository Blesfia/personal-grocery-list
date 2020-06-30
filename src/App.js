import React, { useState, useEffect } from 'react';
import './App.css';
import { load, save } from './ProductService';


function App() {
  const [products, setProducts] = useState(load());
  const [ref, setRef] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState();
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    save(products);
  }, [products]);

  const onAddProduct = () => {
    setProducts([...products, { ref, name }]);
  }

  const onRemoveProduct = (product) => {
    const newProducts = [...products];
    newProducts.splice(products.indexOf(product), 1);
    setProducts(newProducts);
  }

  const onAddPrice = (product) => {
    const index = products.indexOf(product);
    const newProducts = [...products];
    newProducts[index].prices = newProducts[index].prices || [];
    newProducts[index].prices.push({ price: Number(price), date: new Date(date) });
    newProducts[index].lastPrice = Number(price);
    newProducts[index].average = newProducts[index].prices.reduce((p, a) => p + Number(a.price), 0) / newProducts[index].prices.length;
    setProducts(newProducts);
  }

  return (
    <div className="App">
      Date: <input type="date" onChange={(e) => setDate(e.target.value)} name="date"/>
      <table>
        <thead>
          <tr>
            <td>Referencia</td>
            <td>Nombre</td>
            <td>Precio</td>
            <td>Promedio</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={ref} onChange={(e) => setRef(e.target.value)} name="ref"/></td>
            <td><input value={name} onChange={(e) => setName(e.target.value)} name="name"/></td>
            <td></td>
            <td></td>
            <td><button onClick={onAddProduct}>Añadir</button></td>
          </tr>
          {products.map((p,i) => (<tr key={i}>
          <td>{p.ref}</td>
          <td>{p.name}</td>
          <td>{p.lastPrice}</td>
          <td>{p.average}</td>
          <td>
            <button onClick={() => onRemoveProduct(p)}>Eliminar</button>
            <input onChange={(e) => setPrice(e.target.value)}></input><button onClick={() => onAddPrice(p)}>Añadir precio</button>
          </td>
          </tr>)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
