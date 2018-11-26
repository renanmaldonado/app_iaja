//========= renderizador =============//
var renderizador; 
(function (renderizador) {

	//---------// 
	function geraTabela(json) {
		//console.log(JSON.stringify(json));
		var tabela = ''; 
		/*  var params = location.getQueryParams();
		var posicao= parseInt(params['posicao']);   
		var lista = json[posicao];   */
		
		$('#nomeUsuario').empty().html(json.Nome); 
		var UrlVolta =    'menu_dados.html?Url=' +codifica(json.UrlVolta + imei)     +'&Menu=' ;
		$('#linkVoltar').attr("href",UrlVolta);
		 
		if(json.dados != undefined && json.dados != 'null'  && json.dados != '' && json.dados != null){
			var lista = json.dados; 
			//$('#cosoleLogMenu').append(JSON.stringify(json));
			for (var aa = 0, dados_1 = lista ; aa < dados_1.length; aa++) {
				var linha = dados_1[aa]; 
				var Url = linha['Url'] ; 
				//endereco = Url.split("/"); 
				//var menuu1 = endereco[4]; 
				//var menuu = menuu1.split("?");   
				//console.log('menu : '+menuu[0]);
				/* 
				<div class="card"> 
					<a href="quemsomos.html" class="btn btn-primary" style="height:85px;">
					<span class="info-box-icon"><i class="fa fa-users"></i></span>  
					<br><h5 style="float:left;">QUEM SOMOS</h5></a> 
				</div>
				*/
				 
				console.log(((linha['Grid'])? Url+ imei:Url + imei));
				var URLhref = '';
				var icone_fa = '';
				if(linha['Proc']){
					URLhref = "javascript:proc.procedimentoExterno('"+Url+"')" ;
					icone_fa =  '<i class="fa fa-share-square-o" aria-hidden="true"></i>' ;
				}else{
					URLhref = ( (linha['Grid'])? 'dados.html?posicao='+aa+'&Url='+codifica(Url+ imei) : 'menu_dados.html?posicao='+aa+'&Url=' +codifica(Url + imei)) +'&Menu=' + linha['Menu'] ;
					icone_fa = ((linha['Grid'])?'<i class="fa fa-table" aria-hidden="true"></i>' : '<i class="fa fa-bars" aria-hidden="true"></i>');									
				}
				
				tabela += '<div class="col-lg-6 m-b-2"> <div class="card"> ' +  
				'<a href="' + URLhref + '" class="btn btn-primary" style="line-height: 1.0;min-height:55px;">';
			  
				tabela += '<span class="info-box-icon">'
				+ icone_fa
				+ '</span>' 
				+ '<br/>';
				 
				tabela +=  '<h5  style="float:left;text-transform:uppercase;">' + linha['Menu']  + '</h5>'  ;
				
				if(linha['captions'].length > 0){
					var captions = linha['captions'];
					for (var jj = 0, ca = captions; jj < ca.length; jj++) {
						var capt = ca[jj];
						tabela += '';
						tabela += '<br/>' ; 
						tabela += '<h6 style="float:left;text-align:left;width:100%;font-size:'+capt.TamFont+'px;'+((capt.Negrito)? 'font-weight:700;' :''  )+'">'+ capt.Nome+ '</h6>' ;
						tabela += '<br/>'; 
					}
				}
				tabela +=  '</a> '
				+ '</div></div>' ;
			}
		}else{
			alert('Men� inacess�vel')
		} 
		return tabela;
	}
	//---------//

renderizador.geraTabela = geraTabela;
})(renderizador || (renderizador = {}));
//========= renderizador =============//


//========= proc =============//
var proc; 
(function (proc) {
	//---------// 
	function procedimentoExterno(Url){
		$.ajax({
			url: Url,
			method: "GET",
			cache: false,
			dataType: "json", 
			async : true,
			statusCode: {
				404: function() {
					alert( "P�gina inacess�vel" );
					console.log('P�gina inacess�vel');
				}
			}
		}).done(function( data, textStatus, jqXHR  ) {
			console.log('_____');
			console.log(textStatus);
			console.log('_____');
			console.log(jqXHR);
			console.log('_____'); 
			var json = data ;
			alert(json.Msg);
			
		}).fail(function(jqXHR, textStatus, errorThrown  ) {  
			console.log('----------------');
			console.log( "Falha na requisi��o de dados : ");
			console.log(jqXHR); 
			console.log('....');
			console.log(textStatus);
			console.log('....');
			console.log(errorThrown);
			console.log('----------------');
			alert( "N�o foi poss�vel acessar  esta tela com seus respectivos dados" );
			$('#tabeladinamica').css("display","none");
		}).always(function() {
			console.log( "complete" );
		}); 
	}
	//---------//
	proc.procedimentoExterno = procedimentoExterno;
})(proc || (proc = {}));
//========= proc =============//