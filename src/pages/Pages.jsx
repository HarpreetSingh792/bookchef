import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Categories from "../components/Categories";
import { Search } from "../components/Search";
import { SearchPage } from "./SearchPage";
import { Recipes } from "./Recipes";
import { Logo } from "../components/Logo";

export const Pages = () => {
  return (
    <>
      <BrowserRouter>
      <Logo />
        <Search />
        <Categories />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/searched/:search" element={<SearchPage />} />
          <Route path="/recipes/:id" element={<Recipes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

