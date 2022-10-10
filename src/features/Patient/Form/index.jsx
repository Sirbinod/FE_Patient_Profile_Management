// Library Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  notification,
  Space,
  Modal,
  DatePicker,
  Row,
  Col,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../../components/PPMInput";
import { fileupload, patientbyidapi, patientcreateapi, patientupdateapi } from "../../../utils/api";
import { authGet, authPost, filePost, normalPost } from "../../../utils/requiest";
import { patientDefaults } from "./constants";
import { PatientSchema } from "./validation";
import ImgCrop from "antd-img-crop";

const PatientForm = ({ isModel, setIsModel, patientId }) => {
  const [fileList, setFileList] = useState();
  const [date, setDate] = useState();


  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(PatientSchema),
    defaultValues: patientDefaults, // TODO: For edit overwrite defaults here with the selector
  });
  useEffect(() => {
    const fetchData = async () => {
      const patient = await authGet(patientbyidapi(patientId));
      reset(patient.data.data);
    };

    // call the function
    fetchData();
  }, [patientId]);
  const onSubmit = async (data) => {
    
    if (patientId) {
      data._id = patientId;
      data.dob = date;
      const updatePatient = await authPost(patientupdateapi(patientId), data);
    } else {
      data.dob = date;
      const create = await authPost(patientcreateapi, data)
    }
  };

  const onChange = async ({ fileList: newFileList }) => {
    const upload = await filePost(fileupload, newFileList[0].originFileObj);
    setFileList(newFileList);
  };

  const dateChage = (date, dateString) => {
    setDate(dateString);
  }

  return (
    <Modal
      title="Patient Create"
      open={isModel}
      footer={null}
      onCancel={() => {
        setIsModel(false);
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="patient_form">
        <Space direction="vertical" size={"middle"} className="">
          <Input
            name="name"
            control={control}
            label="Full Name"
            required
            error={errors?.country?.message}
            size="large"
          />
          <Input
            name="email"
            control={control}
            label="Email"
            required
            error={errors?.country?.message}
            size="large"
          />
          <Input
            name="contact"
            type="phone"
            control={control}
            label="Contact"
            required
            error={errors?.country?.message}
            size="large"
          />
          <Input
            name="address"
            control={control}
            label="Address"
            required
            error={errors?.country?.message}
            size="large"
          />
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <h4>Date Of Birth</h4>
              <DatePicker onChange={dateChage} />
            </Col>
            <Col className="gutter-row" span={12}>
              <h4>File</h4>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                >
                  {"+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
          <Space>
            <Button htmlType="submit" type="primary" size={"large"}>
              submit
            </Button>
          </Space>
        </Space>
      </form>
    </Modal>
  );
};

export default PatientForm;
