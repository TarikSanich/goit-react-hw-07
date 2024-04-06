import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short name!')
    .max(50, 'Too long name!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too short number!')
    .max(50, 'Too long number!')
    .required('Required'),
});

export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        number: '',
      }}
      onSubmit={(values, { resetForm }) => {
        const newContact = {
          name: values.name,
          number: values.number,
        };
        dispatch(addContact(newContact)); 
        resetForm(); 
      }}
      validationSchema={ContactFormSchema} 
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field className={css.field} type="text" name="name" id={nameFieldId} />
        <ErrorMessage className={css.error} name="name" component="span" />
        <label htmlFor={numberFieldId}>Number</label>
        <Field
          className={css.field}
          type="tel"
          name="number"
          id={numberFieldId}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
        />
        <ErrorMessage className={css.error} name="number" component="span" />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}