import React from 'react';
import {Field, Form, Formik} from 'formik';
import {TFilter} from '../../../redux/usersReducer';

const UsersSearch: React.FC<TProps> = (props) => {
    const onSubmit = (values: TValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        let getBooleanFilterFriend = friendValues.find(v => values.friend === v.text).value;
        let filter = {
            term: values.term,
            friend: typeof values.friend === 'string' ? getBooleanFilterFriend : values.friend
        }
        props.onFilterChanged(filter);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={{term: '', friend: 'all'}}
                onSubmit={onSubmit}
            >
                {({isSubmitting, setFieldValue}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            {friendValues.map(v => {
                                return(
                                    <option value={v.text}>{v.text}</option>
                                )
                            })}
                        </Field>
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

type TValues = { term: string, friend: 'all' | 'followed' | 'unfollowed' }

let friendValues = [
    {id: 0, value: null, text: 'all'},
    {id: 1, value: true, text: 'followed'},
    {id: 2, value: false, text: 'unfollowed'},
];
