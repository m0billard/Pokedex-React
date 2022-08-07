import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const {
      name,
      id,
      species,
      height,
      weight,
      types,
      sprites,
      stats,
      base_stat,
    } = pokemon;
    const { front_default } = sprites;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h1">{toFirstCharUppercase(name)}</Typography>
          <img src={front_default} />
          <Typography variant="h3">Informations du Pokémon</Typography>
          <Typography>Taille du Pokémon: {height} </Typography>
          <Typography>Poids du pokémon: {weight} </Typography>
          <Typography variant="h4">Statistiques</Typography>
          {stats.map((statInfo) => {
            const { stat } = statInfo;
            const { name } = stat;
            return (
              <Typography key={name}>
                {" "}
                {name} : {}
              </Typography>
            );
          })}
          <Typography variant="h4"> Types:</Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return (
              <Typography key={name}>
                {" "}
                {`${toFirstCharUppercase(name)}`}
              </Typography>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          Retourner au Pokédex
        </Button>
      )}
    </>
  );
};

export default Pokemon;
