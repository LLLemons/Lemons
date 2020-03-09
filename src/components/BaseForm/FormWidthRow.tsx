import { Col, Form, Row } from 'antd';
import { FormInstance, FormItemProps } from 'antd/es/form';
import React from 'react';
import { RowProps } from 'antd/es/row';
import { ColProps } from 'antd/es/col';

interface RowFormProps {
  form: FormInstance;
  formList: {
    key: string | number;
    formItemProps: FormItemProps;
    colProps?: ColProps;
  }[];
  formItemProps?: FormItemProps;
  rowProps?: RowProps;
  colProps?: ColProps;
  fixedRightCol?: React.ReactNode;
}

function FormWidthRow(props: RowFormProps) {
  const { form: propsForm, formList, rowProps, colProps, formItemProps, fixedRightCol } = props;
  const [form] = Form.useForm(propsForm);
  return (
    <Form form={form} wrapperCol={{ span: 16 }} labelCol={{ span: 8 }} labelAlign={'right'}>
      <Row {...rowProps}>
        {formList.map(item => (
          <Col {...colProps} {...item.colProps} key={item.key}>
            <Form.Item {...formItemProps} {...item.formItemProps}>
              {item.formItemProps.children}
            </Form.Item>
          </Col>
        ))}
        {fixedRightCol ? (
          <Col style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {fixedRightCol}
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </Form>
  );
}
export default FormWidthRow;
