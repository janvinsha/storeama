import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{ 
    font-family: 'Rubik', sans-serif;
    overflow-x:hidden;
    color:${({ theme }) => (theme ? "white" : "black")};
    transition:0.3s ease-in-out;
    background: ${({ theme }) => (theme ? "#16161A" : "#ffffff")};
 
}
input,textarea{
    font-family: 'Rubik', sans-serif;
    color:${({ theme }) => (theme ? "white" : "black")};
}
button{
    font-family: 'Rubik', sans-serif;
  cursor:pointer;
  color:white;
  background:#20b2aa;
  border-radius:0.5px;
  border:2px solid #20b2aa;
  padding:0.4rem 1.4rem;
  font-size:1.2rem;
  border-radius:0.5rem ;
}
.theme-btn{
    background:none;
    border:none;
    color:${({ theme }) => (theme ? "white" : "black")};
    padding:0rem 0rem
}
.secondary-btn{
    cursor:pointer;
  background:inherit;
  border:2px solid #20b2aa;
  border-radius:0.4rem;
padding:0.4rem 1.4rem;
  font-size:1.2rem;
  color:${({ theme }) => (theme ? "white" : "black")};
  display:flex;
  align-items:center;
  gap:0.1rem;
  border-radius:0.5rem ;
}
.acct-btn{
   display:flex;
   align-items:center;
  background:none;
  gap:0.5rem;
  border:2px solid #20b2aa;
padding:0.4rem 1.4rem;
  color:${({ theme }) => (theme ? "white" : "black")};
    img{  
        background:#20b2aa;
        width:1.5rem;
        height:1.5rem;
        border-radius:50%;
        object-fit:cover;
    }
}
a{
    text-decoration: none;
    color:${({ theme }) => (theme ? "white" : "black")};
}
.App{
 
    font-family: 'Rubik', sans-serif;
    background: ${({ theme }) =>
      theme ? "rgba(22,22,26,1)" : "rgba(255,255,255,1)"};
   
}
h1{
    font-weight:medium;
    font-weight:500; 
}
h2,h3{
    font-weight:lighter;
    font-family: 'Rubik', sans-serif;
}
`;
export default GlobalStyle;
