const tableLossOfControl = {
    keyTable:'lossControl',
    caption:"Отметка о лишении права управления:",
    nameColoumn:{
        term:'Cрок лишения',
        organ:'Орган',
        number:'Дата и номер решения'
    }
}

const tableCertificateWithdrawal = {
    keyTable:'certificateWithdrawal',
    caption:"Отметка об изъятиии удостоверения:",
    nameColoumn:{
        date:'Дата изъятия',
        organ:'Орган',
        position:'Должность (кем произведено изъятие)',
        fio:' Ф.И.О. должностного лица',
    }
}
const tableSpecialMarks ={
    keyTable:'specialMarks',
    caption:"Особые отметки:",
    nameColoumn:{
        date:'Дата',
        note:'Отметка',
    }
}

export const arrayOptionsTables = [tableLossOfControl,tableCertificateWithdrawal,tableSpecialMarks]