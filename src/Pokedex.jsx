import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "40px",
    paddingLeft: "40px",
    paddingRight: "40px",
    backgroundColor: "#525252",
  },
  cardMedia: {
    position: "relative",
    margin: "auto",
    transition: "transform 250ms",
    "&:hover":{
      transform: "translateY(-8px)",
    }
  },
  cardContent: {
    textAlign: "center",
    backgroundColor: "#a5a5a5",
    boxShadow: "inset 0px 8px 5px 0px rgba(0, 0, 0, .2)",

    "&:hover":{
      backgroundColor: "white",
      cursor: "pointer",
      boxShadow: "inset 0px 8px 5px 0px rgba(0, 0, 0, 0)",
    }
  },
  searchContainer: {
    display: "flex",
    backgroundColor: "white",
    paddingLeft: "10px",
    paddingRight: "20px",
    paddingBottom: "5px",
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "16px",
    borderRadius: "4px",
  },
  searchInput: {
    width: "200px",
    margin: "0px 5px 5px 5px",
  },
  appBar: {
    backgroundColor: "#000000",
    width:"102%",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={3} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{
              width: "130px",
              height: "130px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`N°${id} ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.searchContainer}>
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Rechercher un Pokémon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
