import { useEffect, useState } from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Wrapper = styled.div`
    margin: 3rem 0rem;
    padding: 0 ;
`;

const Card = styled.div`
    width: 20rem;
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius:2rem;
        position: absolute;
        left:0;
        width: 100%;
        height:100%;
        object-fit: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom:0%;
        transform: translate(-50%,0%);
        color: white;
        width: 100%;
        text-center: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom,rgba(0,0,0,0), rgba(0,0, 0,0.45));
`


function Veggie() {
    const [Veggie,setVeggie]=useState([]);
    useEffect(()=>{
        getPopular();
    },[]);

    const getPopular = async()=>{

        const check = localStorage.getItem("Veggie");

        if(check)
        {
            setVeggie(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('Veggie',JSON.stringify(data.recipes))
            setVeggie(data.recipes)
            console.log(data.recipes)
        }


    }
  return (
    <div>
            <Wrapper>
                <h3>Our Vegetarian Picks</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem",
                }}>
                {Veggie.map((recipe)=>{
                    return(
                        <SplideSlide id={recipe.id}>
                        <Card>
                            <Link to={'./recipe/'+ recipe.id}>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title}/>
                        <Gradient/>
                            </Link>
                        </Card>
                        </SplideSlide>
                    );
                })}
                </Splide>
                
            </Wrapper>
    </div>
  );
}


export default Veggie;