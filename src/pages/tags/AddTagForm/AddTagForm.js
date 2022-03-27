import React from 'react';
import cn from 'classnames';
import { Form, Field } from 'react-final-form'
import { Button, TextAreaAdapter } from 'components';
import { useSetCurrentLocation } from 'hooks'
import useFormSetup from './useFormSetup';
import useFetchTagByIdDispatch from './useFetchTagByIdDispatch';
import styles from './AddTagForm.module.css';
import useTagByIdSelector from 'redux/selectors/useTagById';

const AddTagePage = ({ tagId }) => {
    useSetCurrentLocation(`/tag/${tagId}`);
    useFetchTagByIdDispatch(tagId);
    const tag = useTagByIdSelector();
    const { onSubmit } = useFormSetup(tagId);

    return (
        <div className={styles.container}>
            <div className={styles.topButtonOutline}>
                <div className="outline-submit">
                    <Button type="submit" className={cn(styles.submit, "glyphicon glyphicon-floppy-save")} form="tagForm" data-test-id="addTagPageSubmit"/>
                </div>
            </div>
            <Form
                onSubmit={onSubmit}
                initialValues={tag}
                render={({ handleSubmit }) => {
                    return (
                        <form
                            id="tagForm"
                            data-test-id="form"
                            className={styles.form}
                            onSubmit={handleSubmit}>

                            <Field
                                name="name"
                                component="input"
                                className={styles.name}
                            />
                            <Field
                                name="description"
                                cols="80"
                                rows="10"
                                className={styles.description}
                                component={TextAreaAdapter}
                            />
                        </form>
                    );
                }}
            />
        </div>
    );
}

export default AddTagePage;