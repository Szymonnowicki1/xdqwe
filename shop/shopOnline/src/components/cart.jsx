import React, { useState, useEffect } from "react";
import "./cart.css"
import zdjecie from "../assets/NIKE+AIR+MAX+PLUS+III.avif"
import Menu from "./menu"
import AddBtn from "./addBtn";
import { Link } from "react-router-dom";
import { GenderContext } from "../context/GenderContext";
import { createContext, useContext } from "react";

const Cart = () => {

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            setClothes(data);
            setAllClothes(data);
        });
    },[])

    const [allClothes,setAllClothes] = useState([])
    const [clothes,setClothes] = useState([])

    const {chooseGnder,setChooseGender} = useContext(GenderContext)

    useEffect(() => {
        if(chooseGnder == "Man"){
                const onlyMan = allClothes.filter((x) => x.gender == "man")
                setClothes(onlyMan)
        }
        else if(chooseGnder == "Woman"){
                const onlyWoman = allClothes.filter((x) => x.gender == "woman")
                setClothes(onlyWoman)
        }
    },[chooseGnder, allClothes])


    
    return(
        <div className="container">
            <div className="menu">
                <Menu clothes={clothes} setClothes={setClothes} allClothes={allClothes}/>
            </div>
            <div className="products">
                {clothes.map((c,id) => (
                    <Link to={`/product/${c.id}`} className="cart" key={id} state={{product:c}}>
                    <div className="imgContainer"><img src={c.images[0]} alt="" style={{ width: "100%", height: 250 }}/></div>
                    <h3>{c.title}</h3>
                    <div className="price">{c.price} zl</div>
                    </Link>
                ))}
        </div>
        </div>
    )
}

export default Cart;