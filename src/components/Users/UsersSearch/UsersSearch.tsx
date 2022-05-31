import React from 'react';
import {Field, Form, Formik} from 'formik';
import {TFilter} from '../../../redux/usersReducer';

const UsersSearch: React.FC<TProps> = (props) => {
    const onSubmit = (values: TFilter, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default UsersSearch;

type TProps = {
    onFilterChanged: (filter: TFilter) => void
}
