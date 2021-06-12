
CREATE DATABASE IF NOT EXISTS `POSTSDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `POSTSDB`;



DROP TABLE IF EXISTS `POSTS`;
CREATE TABLE IF NOT EXISTS `POSTS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `creation` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_modified` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_user` int(11) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `POSTS`
--

INSERT INTO `POSTS` (`id`, `title`, `content`, `creation`, `last_modified`, `id_user`, `tags`, `disabled`) VALUES
(1, 'Prueba 1 - editado', '#lorem ipsum dolor sit amet\n\n ##consectetur\n\n adipiscing elit lorem impsum lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2021-06-06 20:17:06', '2021-06-07 02:10:56', 1, NULL, 0),
(2, 'Prueba 2', '# Prueba 2\n\nESta es una prueba\n\n', '2021-06-07 01:51:59', '2021-06-07 10:56:21', 1, NULL, 1),
(3, 'Prueba 2', '#EA confirma hackeo masivo: los atacantes tienen 780 GB de datos, incluyendo cÃ³digo fuente de â€˜FIFA 21â€™ y el motor Frostbite\n\nElectronic Arts se une a la lista de empresas que han sufrido un hackeo en el transcurso del aÃ±o. Los responsables mencionaron que cuentan con 780 GB de datos de la compaÃ±Ã­a y su finalidad es vender toda la informaciÃ³n.\n\nElectronic Arts le confirmÃ³ a Motherboard que sufrieron una violaciÃ³n de datos y que los datos listados por el grupo de hackers, es la misma informaciÃ³n que fue robada. El medio tuvo acceso a capturas de pantalla de los mensajes publicados en los foros, donde seÃ±alan que cuentan con el cÃ³digo fuente de â€˜FIFA 21â€™.\n\n![Imagen](https://i.blogs.es/1bb142/electronic-arts-logo/1366_2000.jpg)', '2021-06-10 17:29:03', '2021-06-10 17:29:03', 1, NULL, 0),
(4, 'Prueba 3', '#La serie A se renueva en MÃ©xico: Galaxy A32, A52 y A72; precios y especificaciones\n\n**La serie Galaxy A de Samsung llega a MÃ©xico**, los nuevos **Galaxy A32, A52 y A72**, son la propuesta de gama media de la compaÃ±ia, pero con caracterÃ­sticas de gama alta. Hace unas semanas, **Samsung presentÃ³ los Galaxy A52 y Galaxy A72** y el dÃ­a de hoy lanza la serie en MÃ©xico junto con el **Galaxy A32.**\n\n![ Modelos de samsung](https://parentesis.com/imagesPosts/a3200.jpg)', '2021-06-10 17:44:47', '2021-06-10 17:46:29', 1, NULL, 0),
(5, 'Prueba 4', '# Los partidazos que no te puedes perder en la Euro 2020\n\n##TURQUÃA VS ITALIA\n\n![Jugadores de Italia celebrando un gol](https://stadium-azteca.underdog.gs/soccerly/1/2021/06/09/1623297399.jpg)\n\n Es el primer partido de la **Euro 2020** y aunque en el papel Italia parecerÃ­a el favorito porque los turcos nunca han podido vencer a los _Azzurri_. En las eliminatorias para Qatar 2022, TurquÃ­a, de manera sorpresiva, tomÃ³ el liderato del Grupo 7 con dos triunfos y un empate.\n\n', '2021-06-10 22:47:33', '2021-06-10 22:47:33', 1, NULL, 0),
(6, 'Prueba 5', '# Promise\n\nEl objeto <span className=\"bg-gray-200 font-mono inline-block font-bold \">Promise</span> (Promesa) es usado para computaciones asÃ­ncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.\n\n    new Promise( /* ejecutor */ function(resolver, rechazar) { ... } );\n', '2021-06-10 23:39:12', '2021-06-10 23:39:12', 1, NULL, 0),
(7, 'Prueba 6', '# Promise\n\nEl objeto <span className=\"bg-gray-200 font-mono inline-block font-bold \">Promise</span> (Promesa) es usado para computaciones asÃ­ncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.\n\n    new Promise( /* ejecutor */ function(resolver, rechazar) { ... } );\n', '2021-06-10 23:39:17', '2021-06-10 23:40:33', 1, NULL, 1),
(8, 'Prueba 6', '#H1\n##H2\n###H3\n####H4\n', '2021-06-10 23:42:58', '2021-06-10 23:42:58', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
CREATE TABLE IF NOT EXISTS `USERS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER` varchar(50) NOT NULL,
  `PASSWORD` varchar(21) NOT NULL,
  `FIRST_NAME` varchar(25) NOT NULL,
  `LAST_NAME` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER` (`USER`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`ID`, `USER`, `PASSWORD`, `FIRST_NAME`, `LAST_NAME`) VALUES
(1, 'JEBT28', '18100152', 'JUAN', 'TOBON'),
(2, 'INVITADO', 'INV123', 'USUARIO', 'INVITADO');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `POSTS`
--
ALTER TABLE `POSTS`
  ADD CONSTRAINT `POSTS_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `USERS` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
