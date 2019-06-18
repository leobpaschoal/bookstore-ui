import { Modal } from 'antd';

export const information = content => {
  Modal.info({ width: 800, title: 'Information', content });
};
export const success = content => {
  Modal.success({ title: 'Success', content });
};

export const error = content => {
  Modal.error({ title: 'Error', content });
};

export const warning = content => {
  Modal.warning({ title: 'Warning', content });
};
