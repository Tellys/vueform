export default {
	"vueform": {
		"elements": {
			"list": {
				"add": "+ Adicionar",
				"remove": "&times;"
			},
			"file": {
				"defaultName": "Arquivos",
				"dndTitle": "Selecione o(s) Arquivo(s)",
				"dndDescription": "Arraste o arquivo ou clicar aqui para carregar",
				"removeConfirm": "Ao remover o arquivo, ele será excluído permanentemente. Continuar?",
				"select": "Selecionar Arquivo",
				"upload": "Salvar"
			},
			"multifile": {
				"uploadButton": "Carregar Arquivos",
				"dndTitle": "Selecione o(s) Arquivo(s)",
				"dndDescription": "Arraste o arquivo ou clicar aqui para carregar"
			},
			"gallery": {
				"uploadButton": "Carregar imagen(s)",
				"dndTitle": "Carregar imagen(s)",
				"dndDescription": "Arraste a(s) imagen(s) ou clicar aqui para carregar"
			}
		},
		"steps": {
			"finish": "Finalizar",
			"next": "Próximo",
			"previous": "Anterior"
		},
		"editor": {
			"acceptedMimesError": "Os tipos aceitos são: :mimes",
			"acceptedExtensionsError": "As extensões aceitas são: :extensions"
		},
		"datepicker": {
			"weekdays": {
				"shorthand": [
					"Dom",
					"Seg",
					"Ter",
					"Qua",
					"Qui",
					"Sex",
					"Sáb"
				],
				"longhand": [
					"Domingo",
					"Segunda-feira",
					"Terça-feira",
					"Quarta-feira",
					"Quinta-feira",
					"Sexta-feira",
					"Sábado"
				]
			},
			"months": {
				"shorthand": [
					"Jan",
					"Fev",
					"Mar",
					"Abr",
					"Mai",
					"Jun",
					"Jul",
					"Ago",
					"Set",
					"Out",
					"Nov",
					"Dez"
				],
				"longhand": [
					"Janeiro",
					"Fevereiro",
					"Março",
					"Abril",
					"Maio",
					"Junho",
					"Julho",
					"Agosto",
					"Setembro",
					"Outubro",
					"Novembro",
					"Dezembro"
				]
			},
			"daysInMonth": [
				31,
				28,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			],
			"firstDayOfWeek": 0,
			"ordinal": function () {
				return '';
			},
			"rangeSeparator": " até ",
			"weekAbbreviation": "Wk",
			"scrollTitle": "Role para aumentar",
			"toggleTitle": "Clique para alternar",
			"amPM": [
				"AM",
				"PM"
			],
			"yearAriaLabel": "Ano",
			"monthAriaLabel": "Mês",
			"hourAriaLabel": "Hora",
			"minuteAriaLabel": "Minuto"
		},
		"dateFormats": {
			"datetimeSeconds24": "DD/MM/YYYY, HH:mm:ss",
			"datetimeSeconds12": "DD/MM/YYYY, hh:mm:ss a",
			"datetime24": "DD/MM/YYYY, HH:mm",
			"datetime12": "DD/MM/YYYY, hh:mm a",
			"timeSeconds24": "HH:mm:ss",
			"timeSeconds12": "hh:mm:ss a",
			"time24": "HH:mm",
			"time12": "hh:mm a",
			"date": "DD/MM/YYYY"
		},
		"multiselect": {
			"multipleLabelOne": "1 opção selecionada",
			"multipleLabelMore": ":options opções selecionadas",
			"noResults": "Nenhuma opção encontrada",
			"noOptions": "A lista está vazia"
		},
		"defaultMessage": "Campo inválido",
		"a11y": {
			"file": {
				"description": "Pressiona Backspace para remover"
			},
			"list": {
				"remove": "Remover o item abaixo"
			}
		}
	},
	"validation": {
		"accepted": "O campo :attribute deve ser aceito.",
		"active_url": "O campo :attribute deve conter uma URL válida.",
		"after": "O campo :attribute deve conter uma data posterior à :date.",
		"after_or_equal": "O campo :attribute deve conter uma data superior ou igual à :date.",
		"alpha": "O campo :attribute deve conter somente letras.",
		"alpha_dash": "O campo :attribute deve conter apenas letras, números e traços.",
		"alpha_num": "O campo :attribute deve conter apenas letras e números .",
		"array": "O campo :attribute deve conter um array.",
		"before": "O campo :attribute deve conter uma data anterior à :date.",
		"before_or_equal": "O campo :attribute deve conter uma data inferior ou igual à :date.",
		"between": {
			"numeric": "O campo :attribute deve conter um número entre :min e :max.",
			"file": "O campo :attribute deve conter um arquivo de :min a :max kilobytes.",
			"string": "O campo :attribute deve conter entre :min e :max caracteres.",
			"array": "O campo :attribute deve conter de :min a :max itens."
		},
		"boolean": "O campo :attribute deve conter o valor verdadeiro ou falso.",
		"confirmed": "A confirmação para o campo :attribute não coincide.",
		"date": "O campo :attribute não contém uma data válida.",
		"date_format": "A data informada para o campo :attribute não respeita o formato :format.",
		"date_equals": "O campo :attribute deve ser uma data igual à :date.",
		"different": "Os campos :attribute e :other devem conter valores diferentes.",
		"digits": "O campo :attribute deve conter :digits dígitos.",
		"digits_between": "O campo :attribute deve conter entre :min e :max dígitos.",
		"dimensions": "O valor informado para o campo :attribute não é uma dimensão de imagem válida.",
		"distinct": "O campo :attribute contém um valor duplicado.",
		"email": "O campo :attribute não contém um endereço de email válido.",
		"exists": "O valor selecionado para o campo :attribute é inválido.",
		"file": "O campo :attribute deve conter um arquivo.",
		"filled": "O campo :attribute é obrigatório.",
		"gt": {
			"numeric": "O campo :attribute deve ser maior que :value.",
			"file": "O arquivo :attribute deve ser maior que :value kilobytes.",
			"string": "O campo :attribute deve ser maior que :value caracteres.",
			"array": "O campo :attribute deve ter mais que :value itens."
		},
		"gte": {
			"numeric": "O campo :attribute deve ser maior ou igual a :value.",
			"file": "O arquivo :attribute deve ser maior ou igual a :value kilobytes.",
			"string": "O campo :attribute deve ser maior ou igual a :value caracteres.",
			"array": "O campo :attribute deve ter :value itens ou mais."
		},
		"image": "O campo :attribute deve conter uma imagem.",
		"in": "O campo :attribute não contém um valor válido.",
		"in_array": "O campo :attribute não existe em :other.",
		"integer": "O campo :attribute deve conter um número inteiro.",
		"ip": "O campo :attribute deve conter um IP válido.",
		"ipv4": "O campo :attribute deve conter um IPv4 válido.",
		"ipv6": "O campo :attribute deve conter um IPv6 válido.",
		"json": "O campo :attribute deve conter uma string JSON válida.",
		"lt": {
			"numeric": "O campo :attribute deve ser menor que :value.",
			"file": "O arquivo :attribute ser menor que :value kilobytes.",
			"string": "O campo :attribute deve ser menor que :value caracteres.",
			"array": "O campo :attribute deve ter menos que :value itens."
		},
		"lte": {
			"numeric": "O campo :attribute deve ser menor ou igual a :value.",
			"file": "O arquivo :attribute ser menor ou igual a :value kilobytes.",
			"string": "O campo :attribute deve ser menor ou igual a :value caracteres.",
			"array": "O campo :attribute não deve ter mais que :value itens."
		},
		"max": {
			"numeric": "O campo :attribute não pode conter um valor superior a :max.",
			"file": "O campo :attribute não pode conter um arquivo com mais de :max kilobytes.",
			"string": "O campo :attribute não pode conter mais de :max caracteres.",
			"array": "O campo :attribute deve conter no máximo :max itens."
		},
		"mimes": "O campo :attribute deve conter um arquivo do tipo: :values.",
		"mimetypes": "O campo :attribute deve conter um arquivo do tipo: :values.",
		"min": {
			"numeric": "O campo :attribute deve conter um número maior ou igual a :min.",
			"file": "O campo :attribute deve conter um arquivo com no mínimo :min kilobytes.",
			"string": "O campo :attribute deve conter no mínimo :min caracteres.",
			"array": "O campo :attribute deve conter no mínimo :min itens."
		},
		"not_in": "O campo :attribute contém um valor inválido.",
		"not_regex": "O formato do valor :attribute é inválido.",
		"numeric": "O campo :attribute deve conter um valor numérico.",
		"present": "The :attribute field must be present.",
		"regex": "O formato do valor informado no campo :attribute é inválido.",
		"required": "O campo :attribute é obrigatório.",
		"required_if": "O campo :attribute é obrigatório quando :other é :value.",
		"required_unless": "O campo :attribute é obrigatório a menos que :other esteja em :values.",
		"required_with": "O campo :attribute é obrigatório quando :values esta preenchido.",
		"required_with_all": "O campo :attribute é obrigatório quando :values estiver preenchido.",
		"required_without": "O campo :attribute é obrigatório quando :values is not preenchido.",
		"required_without_all": "O campo :attribute é obrigatório quando :values não estiver preenchido.",
		"same": "Os campos :attribute e :other devem conter valores iguais.",
		"size": {
			"numeric": "O campo :attribute deve conter o número :size.",
			"file": "O campo :attribute deve conter um arquivo com o tamanho de :size kilobytes.",
			"string": "O campo :attribute deve conter :size caracteres.",
			"array": "O campo :attribute deve conter :size itens."
		},
		"string": "O campo :attribute deve ser uma string.",
		"timezone": "O campo :attribute deve conter um fuso horário válido.",
		"unique": "O valor informado para o campo :attribute já está em uso.",
		"uploaded": "O campo :attribute falhou durante o upload.",
		"url": "O formato da URL informada para o campo :attribute é inválido.",
		"uuid": "O campo :attribute deve ser um UUID válido.",
		"remote": "O campo :attribute é inválido."
	}
}