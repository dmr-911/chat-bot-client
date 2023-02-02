import React from 'react'
import CheckBoxGroup from './checkBoxGroup';
import Input from './input';
import RadioButtons from './radioButtons';
import Select from './select';
import TextArea from './textArea';

const FormikControl = (props) => {
    const {control, ...rest} = props;
    switch(control){
        case 'input': 
            return <Input {...rest}/>
        case 'textarea':
            return <TextArea {...rest}/>
        case 'select':
            return <Select {...rest}/>
        case 'radio':
            return <RadioButtons {...rest}/>
        case 'checkbox':
            return <CheckBoxGroup {...rest}/>
        default : return null
    }
}

export default FormikControl