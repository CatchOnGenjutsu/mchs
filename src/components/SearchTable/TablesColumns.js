export const SMALLBOATS_COLUMNS = [
	{
		Header: "Рег. номер",
		accessor: "regNum",
	},
	{
		Header: "Заводской номер судна",
		accessor: "boatVin",
	},
	{
		Header: "ФИО Собственника",
		accessor: "owner",
	},
	{
		Header: "Наименование организации",
		accessor: "nameLe",
	},
	{
		Header: "УНП",
		accessor: "unp",
	},
	{
		Header: "Заводской номер двигателя",
		accessor: "engvin",
	},

];

export  const SERTIFICATES_COLUMNS = [
	{
		Header: "Номер удостоверения",
		accessor: "licenseNum",
	},
	{
		Header: "Идентификационный номер",
		accessor: "persNum",
	},
	{
		Header: "ФИО",
		accessor: "fio",
	},
	{
		Header: "Дата рождения",
		accessor: "birthDate",
	},
	{
		Header: "Тип удостоверения",
		accessor: "licenseType",
	},
	{
		Header: "Дата выдачи",
		accessor: "licenseDate",
	},
	{
		Header: "Действителен до",
		accessor: "licenseDateEnd",
	}
]
export const BUILDING_COLUMNS = [
	{
		Header: "Наименование ЮЛ (ФИО ФЛ, ИП) эксплуатанта базы",
		accessor: "ownerLeName",
	},
	{
		Header: "Адрес и телефон эксплуатанта базы",
		accessor: "ownerContact",
	},
	{
		Header: "Местонахождние и телефон базы",
		accessor: "baseContact",
	},
	{
		Header: "Наименование должности, ФИО, ответственного за эксплуатацию базы, номер и дата приказа о назначении",
		accessor: "responData",
	},
	{
		Header: "Дата последнего обследования",
		accessor: "checkDate",
	},
	{
		Header: "Результат последнего обследования",
		accessor: "statusName",
	},
	{
		Header: "Участок",
		accessor: "sectionName",
	},
	{
		Header: "Примечание",
		accessor: "note",
	},

]