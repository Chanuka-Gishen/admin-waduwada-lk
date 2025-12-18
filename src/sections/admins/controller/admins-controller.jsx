import { useEffect, useState } from 'react';

import useAdmin from 'src/hooks/use-admin';
import { AdminsView } from '../view/admins-view';
import useAuthStore from 'src/store/auth-store';

const AdminsController = () => {
  const tableColumns = [
    'Admin Name',
    'Email',
    'Role',
    'Reset Password',
    'Last Login At',
    'Is Active',
  ];

  const { auth } = useAuthStore();

  const user = auth.user;

  const {
    admins,
    isLoadingAdmins,
    isLoadingAdminRegister,
    isLoadingAdminUpdate,
    isLoadingAdminChangePwd,
    fetchAdmins,
    registerAdmin,
    updateAdmin,
    changePasswordAdmin,
  } = useAdmin();

  const [initialValues, setInitialValues] = useState({});

  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const handleToggleRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  const handleToggleUpdate = (row = null) => {
    if (!isOpenUpdate && !row) return;

    setInitialValues(
      row
        ? {
            id: row._id,
            adminFirstName: row.adminFirstName,
            adminLastName: row.adminLastName,
            adminEmail: row.adminEmail,
            adminRole: row.adminRole,
            adminIsActive: row.adminIsActive,
            isAdminFirstLogin: row.isAdminFirstLogin,
          }
        : {}
    );

    setIsOpenUpdate(!isOpenUpdate);
  };

  const handleRegister = async (data) => {
    const success = await registerAdmin(data);

    if (success) {
      handleToggleRegister();
    }
  };

  const handleUpdate = async (values) => {
    const success = await updateAdmin(values);

    if (success) {
      handleToggleUpdate();
    }
  };

  const handleChangePwd = async (values) => {
    await changePasswordAdmin(values);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminsView
      admins={admins}
      isSelectedCurrentAdmin={initialValues?.id === user.id}
      initialValues={initialValues}
      tableColumns={tableColumns}
      isOpenCreate={isOpenRegister}
      isOpenUpdate={isOpenUpdate}
      isLoading={isLoadingAdmins}
      isLoadingRegister={isLoadingAdminRegister}
      isLoadingUpdate={isLoadingAdminUpdate}
      isLoadingChangePwd={isLoadingAdminChangePwd}
      handleToggleRegister={handleToggleRegister}
      handleToggleUpdate={handleToggleUpdate}
      handleRegister={handleRegister}
      handleUpdate={handleUpdate}
      handleChangePwd={handleChangePwd}
    />
  );
};

export default AdminsController;
