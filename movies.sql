-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2020 a las 20:39:17
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `movies`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movie`
--

CREATE TABLE `movie` (
  `Id` int(11) NOT NULL,
  `Title` varchar(250) NOT NULL,
  `Release Year` int(11) NOT NULL,
  `Casting` varchar(255) NOT NULL,
  `Directors` varchar(255) NOT NULL,
  `Producers` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movie`
--

INSERT INTO `movie` (`Id`, `Title`, `Release Year`, `Casting`, `Directors`, `Producers`) VALUES
(1, 'Siempre de Luna Nueva', 2006, 'Liliana Mora, Lucas Castro, Joaquin Madero', 'Susana Lombi, Carolina Morris', 'Ana Maria Sofo'),
(2, 'Un Gato Loco Por La Ciudad', 1995, 'Liliana Mora, Sandra Oz, Joaquin Madero, Felipe Pol', 'Cheline Soil, Javier Jantin', 'Antes De Ayer Producciones'),
(3, 'Las Mañanas Y Los Atardeceres', 2013, 'Andy Paz, Lucas Castro, Joaquin Madero', 'Carolina Morris, Javier Jantin', 'Antes De Ayer Producciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `person`
--

CREATE TABLE `person` (
  `Id` int(11) NOT NULL,
  `Last Name` varchar(50) NOT NULL,
  `First Name` varchar(50) NOT NULL,
  `Aliases` varchar(250) NOT NULL,
  `Movies As Actor Actress` varchar(255) NOT NULL,
  `Movies As Director` varchar(255) NOT NULL,
  `Movies As Producer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `person`
--

INSERT INTO `person` (`Id`, `Last Name`, `First Name`, `Aliases`, `Movies As Actor Actress`, `Movies As Director`, `Movies As Producer`) VALUES
(2, 'Mora', 'Liliana', '', 'Siempre de Luna Nueva, Un Gato Loco Por La Ciudad', '', ''),
(3, 'Castro', 'Lucas', '', 'Siempre de Luna Nueva, Las Mañanas Y Los Atardecers', '', ''),
(4, 'Madero', 'Joaquin', '', 'Siempre de Luna Nueva, Las Mañanas Y Los Atardecers, Un Gato Loco Por La Ciudad', '', ''),
(5, 'Oz', 'Sandra', '', 'Un Gato Loco Por La Ciudad', '', ''),
(6, 'Pol', 'Felipe', '', 'Un Gato Loco Por La Ciudad', '', ''),
(7, 'Paz', 'Andy', '', 'Las Mañanas Y Los Atardeceres', '', ''),
(8, 'Lombi', 'Susana', '', '', 'Siempre de Luna Nueva', ''),
(9, 'Morris', 'Carolina', '', '', 'Siempre de Luna Nueva, Las Mañanas Y Los Atardeceres', ''),
(10, 'Soil', 'Cheline', '', '', 'Un Gato Loco Por La Ciudad', ''),
(11, 'Jantin', 'Javier', '', '', 'Un Gato Loco Por La Ciudad, Las Mañanas Y Los Atardeceres', ''),
(12, 'Producciones', 'Antes De Ayer', '', '', '', 'Un Gato Loco Por La Ciudad, Las Mañanas Y Los Atardeceres'),
(13, 'Sofo', 'Ana Maria', '', '', '', 'Siempre de Luna Nueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `password`) VALUES
(1, 'scott', '5ebe2294ecd0e0f08eab7690d2a6ee69'),
(2, 'tester', '60e7f89701c8518383d9a26734ba13f4'),
(3, 'oops', 'e4bff0584bd839b085a49b1df6417a27'),
(4, 'oops45', 'e4bff0584bd839b085a49b1df6417a27');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `movie`
--
ALTER TABLE `movie`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `person`
--
ALTER TABLE `person`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
