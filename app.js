/*
	Programma gestionale per Refresh
	Gestione prevendite e database per i pr e tutta la economia che ne deriva

			by AndriAlbatroz (Andrea Micheli)
*/

//Includo tutte le librerie di cui neccessito

var express = require('express'); //libreria per la gestione delle pagine (freamowork)
var mysql = require('mysql'); //libreria per la connessione rapide ad un db 
var path = require('path'); //libreria per la gestione delle directory del server (serve per prende la direcotry per il rendering delle pagine html && css)
var bodyParser = require('body-parser'); //libreria per la gestione della parte visuale di tutto il server
var cookieParser = require('cookie-parser'); //libreria per la gestione dei cookies
var fs = require("fs");
var pug = require("pug");

//associo alla variabile 'app' tutto il freamwork express

var app = express();

var riga; //varibile per gestire i cookie piu semplicemente
var idv; //varibile che mi dice con che utente (id) sto lavorando 
var idv2; // uguale a sopra lol
var idv3; //idem con patate
var idv4; //riidem con patate
 
var datePrima; //varibile per fare la somma delle prevendite data, senza cosi andando a sostituire il valore precedente, ma vado a fare la somma con quello gia presente e quello inserito nuovo
var vendutePrima; //uguale a sopra solo per le prevendite vendute
var matricolaPrima;

//imposto express per usare le varie libreria prima importate, come body/cookie parser e path

app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views'))); //rendo statica la directory 'views'

//creo una varibile che contiene tutte le info per la connessione al db

var connessioneDB = mysql.createConnection({
	host:     '127.0.0.1',
	user:     'root',
	password: 'citofono98',
	database: 'refresh'
});

//mi connetto al db tramite la varibile precedentemente creata

connessioneDB.connect(function(err) {
	if(err) throw err;
	console.log('Connesso al DB refresh');
});

//impostazione per l'ascolto di express sulla porta 8080

app.listen(process.env.PORT || 8080, function(err) {
	if(err) throw err;
	console.log('Server online sulla porta 8080!');
});

//creo i file .js che mi servono per la gestione dei pug (html dynamico)
 
var jsTabella = pug.compileFileClient("./tabella.pug", { //pug per la creazione della tabella andando ogni volta ad aggiungere e/o togliere i valori, poiche vengono letti dal db, per questo si dice html dinamico
	name: "templateTabella"
});
fs.writeFileSync("./views/js/tabella.js", jsTabella);

var jsDrop = pug.compileFileClient("./select.pug", {
	name: "templateDrop"
});
fs.writeFileSync("./views/js/select.js", jsDrop);

var jsDrop2 = pug.compileFileClient("./select2.pug", {
	name: "templateDrop2"
});
fs.writeFileSync("./views/js/select2.js", jsDrop2);

var jsDrop3 = pug.compileFileClient("./mod.pug", {
	name: "templateMod"
});
fs.writeFileSync("./views/js/mod.js", jsDrop3);

//funzione che mi server per il calcolo del guadagno di un singolo pr in base alle prevendite vendute

function guadagno(vendute) {
	var val = 0;
	if(vendute < 11) val = 0;
	else if(vendute < 21) val = vendute - 10;
	else if(vendute < 52) val = 10 + (vendute - 20) * 1.5;
	else if(vendute < 75) val = 55 + (vendute - 50) * 2;
	else if(vendute < 100) val = 105 + (vendute - 75) * 2.5; 
	else if(vendute > 100) val = 9999; //teoricamente volevo scriver <ci ha fottuto> ma non posso è di tipo int ahahha
	return val;
}

//funzione per il calcolo degli omaggi di un singolo pr in base alle prevendite vendute

function omaggi(vendute) {
	var omaggi = 0;
	if(vendute >= 10) omaggi = ((vendute - 10) / 20) + 1;
	return omaggi;
}

//funzione per la pagina pricnipale

app.get('/',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	res.sendfile(path.join(__dirname + '/views/home.html'));
});

//funzione per il login

app.get('/login',function(req,res) {
	res.sendfile(path.join(__dirname + '/views/login.html'));
});

app.post('/login',function(req,res) {
	connessioneDB.query(
		"SELECT * FROM utenti WHERE user = ? AND hash = SHA1(?)",
		[
			req.body.user,
			req.body.pass
		],
		function(err,righe) {
			if(err) throw err;
			if(righe.length == 0) {
				res.cookie("autenticato","false");
				res.redirect('/login');
			} else {
				riga = righe[0];
				res.cookie("autenticato","true");
				res.cookie("username",riga.user);
				res.cookie("permessi",riga.permessi);
				res.redirect('/?home?permessi='+riga.permessi);
			}
		}
	);
});

//funzione per il logout

app.get('/logout',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	res.cookie("autenticato","false");
	res.redirect('/login');
});

//funzione per la visualizzazione della tabella contenente tutte le info dei pr

app.get('/table',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	connessioneDB.query(
		"SELECT * FROM pr",
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
});

//route che mi server per prendere tutte le prevDate che poi manderò ad una pagina .json alla quale poi andro a prelevare i valori json per elaborarli per metterli in un grafico

app.get('/prevdate',function(req,res) {
	connessioneDB.query(
		"SELECT prevDate FROM pr",
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
});

//route come sopra solo per le prevVen

app.get('/prevvendute',function(req,res) {
	connessioneDB.query(
		"SELECT prevVen FROM pr",
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
})

//route che mi raccoglie tutti i pr e mi li manda in una pagina .json, a cui dopo andro a fare una richiesta parte client per l'elaborazione dei dati .json per racchiuderli in una drop-down-list

app.get('/select',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	connessioneDB.query(
		"SELECT * FROM pr",
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
});

//registra nel db un nuovo pr

app.get('/registerPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	res.sendfile(path.join(__dirname + '/views/registerPr.html'));
});

app.post('/registerPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	var night = req.body.night;
	var camp = req.body.camp;
	var gestione;
	if(night != null && camp == null) {
		gestione = "NighTrip";
	}
	else if(camp != null && night == null) {
		gestione ="CamParty";
	}
	else if(camp == night) {
		gestione = "";
	}
	connessioneDB.query(
		"INSERT INTO pr (nome,cognome,numero,mail,anno,gestione,zona,scuola,prevDate,prevVen) VALUES (?,?,?,?,?,?,?,?,?,?)",
		[
			req.body.nome,
			req.body.cognome,
			req.body.numero,
			req.body.mail,
			req.body.anno,
			gestione,
			req.body.zona,
			req.body.scuola,
			"0",
			"0"
		], function(err) {
			if(err) throw err;
			//res.redirect('/?home?permessi='+riga.permessi);
			res.redirect('/registerPr');
		}
	);
});

//route che verà visualizzata quando si vorrà andare ad aggiungere le prevDate ad un pr, quindi dopo essere passati dal select.html mi manderà a questa pagina con id nell'url, esso gli verra passato da una funzione scritta nel select.html

app.get('/pr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	res.sendfile(path.join(__dirname + '/views/pr.html'));
	idv = String(req.query.id);
	connessioneDB.query(
		"SELECT prevDate FROM pr WHERE id = ?",
		[
			idv
		],
		function(err,righe) {
			if(err) throw err;
			datePrima = righe[0].prevDate;
		}
	);
	connessioneDB.query(
		"SELECT matricola FROM pr WHERE id = ?",
		[
			idv
		],
		function(err,righee) {
			if(err) throw err;
			matricolaPrima = righee[0].matricola;
		}
	);
});

//route uguale a quella sopra solo per le prevVen

app.get('/pr2',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	res.sendfile(path.join(__dirname + '/views/pr2.html'));
	idv2 = String(req.query.id);
	connessioneDB.query(
		"SELECT prevVen FROM pr WHERE id = ?",
		[
			idv2
		],
		function(err,righe) {
			if(err) throw err;
			vendutePrima = righe[0].prevVen;
		}
	);
});

//route per l'invio dei dati inseriti nelle text, andando però a fare la somma dei valori delle prevDate

app.post('/pr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	var dataConsegna = req.body.dataconsegna;
	var dateAgg = req.body.prevDate;
	var matricolaAgg = req.body.matricola;
	var prevDate = String(parseInt(datePrima) + parseInt(dateAgg));
	var matricolaTot = matricolaPrima + "-" + matricolaAgg;
	connessioneDB.query(
		"UPDATE pr SET matricola = ?, prevDate = ?, dataConsegna = ? WHERE id = ?",
		[
			matricolaTot,
			prevDate,
			dataConsegna,
			idv
		],
		function(err) {
			if(err) throw err;
			res.redirect('/table.html');
		}
	);
});

//route uguale a sopra solo per le prevVen

app.post('/pr2',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect("/login");
	var venduteAgg = req.body.prevVen;
	var dataRitiro = req.body.dataritiro;
	var prevVen = String(parseInt(vendutePrima) + parseInt(venduteAgg));
	var cash = guadagno(prevVen);
	var free = omaggi(prevVen);
	connessioneDB.query(
		"UPDATE pr SET prevVen = ?, guadagno = ?, omaggi = ?, dataRitiro = ? WHERE id = ?",
		[
			prevVen,
			cash,
			free,
			dataRitiro,
			idv2
		],
		function(err) {
			if(err) throw err;
			res.redirect('/table.html');
		}
	);
});

//route per la modifica degli username e password

app.get('/modifica',function(req,res) {
	res.sendfile(path.join(__dirname + '/views/modifica.html'));
});

app.post('/modifica',function(req,res) {
	var cUser = req.body.currentuser;
	var cPass = req.body.currentpass;
	var nUser = req.body.newuser;
	var nPass = req.body.newpass1;
	var ok = false;
	connessioneDB.query(
		"SELECT * FROM utenti WHERE user = ? AND hash = SHA1(?)",
		[
			cUser,
			cPass
		],
		function(err,righe) {
			if(err) throw err;
			if(righe.length == 0) {
				res.redirect('/modifica');
			} else {
				ok = true;
				console.log(ok);
			}
		}
	);
	connessioneDB.query(
		"UPDATE utenti SET user = ?, hash = SHA1(?) WHERE id = 1",
		[
			nUser,
			nPass
		],
		function(err) {
			if(err) throw err;
			console.log(req.body.newuser);
			res.redirect('/login');
		}
	);
});

//route per visualizzare il countdown

app.get('/countdown',function(req,res) {
	res.sendfile(path.join(__dirname + '/views/countdown.html'));
});

//route per la modifica dei pr inseriti se si deve modificare qulacosa

app.get('/modificaPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect('/login');
	connessioneDB.query(
		"SELECT * FROM pr",
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
});

//route per la modifica del pr selezionato

app.get('/modPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect('/login');
	res.sendfile(path.join(__dirname + '/views/modPr.html'));
	idv3 = String(req.query.id);
});

app.post('/modPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect('/login');
	connessioneDB.query(
		"UPDATE pr SET nome = ? , cognome = ?, numero = ?, mail = ?, scuola = ?, zona = ?, anno = ? where id = ?",
		[
			req.body.nome,
			req.body.cognome,
			req.body.numero,
			req.body.mail,
			req.body.scuola,
			req.body.zona,
			req.body.anno,
			idv3
		],
		function(err) {
			if(err) throw err;
			res.redirect('/');
		}
	);
 });

//genero una route per passare i dati dell'utente selezionato ad una pagina json cosi da poter inserire nella textbox dell'html il valore precedente (Gennari di merda che mi chiede ste stronzate)

app.get('/getMod',function(req,res) {
	connessioneDB.query(
		"SELECT * FROM pr WHERE id = ?",
		[
			idv3
		],
		function(err,righe) {
			if(err) throw err;
			res.json(righe);
		}
	);
});

//route per l'eliminazione di un pr tramite l'id

app.get('/delPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect('/login');
	res.sendfile(path.join(__dirname + '/views/delPr.html'));
	idv4 = String(req.query.id);
});

app.post('/delPr',function(req,res) {
	if(req.cookies.autenticato != "true") return res.redirect('/login');
	connessioneDB.query(
		"DELETE FROM pr WHERE id = ?",
		[
			idv4
		],
		function(err) {
			if(err) throw err;
			res.redirect('/');
		}
	);
});