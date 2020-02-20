import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
import FetchBlob from 'rn-fetch-blob';
import PropTypes from 'prop-types';
import translate from '~/languages';

import { showErrorSnackbar, showNeutralSnackbar } from '~/services/Snackbar';

import Modal from '~/components/Modal';

import { phaseRT } from '~/services/firebase';

import {
    ModalContainer,
    SubmitButton,
    Title,
    Loading,
    NoReport,
    RowContainer,
    EditIcon,
    IconContainer,
} from './styles';
import { differenceInDays, subDays } from 'date-fns';

export default function ReportModal({
    onDismiss,
    showModal,
    phaseId,
    projectId,
    canSubmit,
}) {
    const [tempFileName, setTempName] = useState();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateLimit, setDateLimit] = useState(0);
    const [info, setInfo] = useState({
        title: '',
        report: '',
    });

    const handleDismiss = () => !saving && onDismiss();

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            return granted;
        } catch (err) {
            showErrorSnackbar('Falha ao baixar arquivo.');
            return false;
        }
    };

    const onDownloadPress = async () => {
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        let canDownload = true;
        if (!hasPermission) {
            canDownload = await requestStoragePermission();
        }
        if (canDownload) {
            FetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: `${FetchBlob.fs.dirs.DownloadDir}/${info.id}`,
                    description: 'Downloading Report',
                },
            }).fetch('GET', info.report);
        }
    };
    const onSendPress = () => showNeutralSnackbar(translate('implementation'));

    const onEditPress = async () => {
        // try {
        //     const res = await DocumentPicker.pick({
        //         type: [
        //             DocumentPicker.types.pdf,
        //             DocumentPicker.types.plainText,
        //             DocumentPicker.types.images,
        //         ],
        //     });
        //     const { uri, type, name } = res;
        //     setTempName(name);
        // } catch (err) {
        //     if (!DocumentPicker.isCancel(err)) {
        //         showErrorSnackbar('Falha ao selecionar arquivo para envio.');
        //     }
        // }
        showNeutralSnackbar(translate('implementation'));
    };

    useEffect(() => {
        const onUpdate = snapshot => {
            const phase = snapshot.val();
            setInfo(phase);
            setDateLimit(
                differenceInDays(
                    new Date(phase.endDate),
                    subDays(new Date(), 1)
                ) > 0
            );
            setTempName(phase.report ? phase.id : null);
            setLoading(false);
        };

        const load = async () => {
            if (phaseId) {
                await phaseRT(projectId, phaseId, onUpdate);
            }
        };

        setLoading(true);
        load();
    }, [phaseId, projectId]);

    return (
        <Modal isVisible={showModal} onDismiss={handleDismiss} maxHeight="40%">
            {loading ? (
                <Loading />
            ) : (
                <ModalContainer>
                    <ModalContainer>
                        <Title>{info.title}</Title>
                        <RowContainer>
                            <NoReport>
                                {tempFileName ||
                                    translate('project_empty_report')}
                            </NoReport>
                            {canSubmit && dateLimit && (
                                <IconContainer onPress={onEditPress}>
                                    <EditIcon />
                                </IconContainer>
                            )}
                        </RowContainer>
                    </ModalContainer>
                    {info.report && (
                        <SubmitButton
                            transparent
                            loading={saving}
                            onPress={onDownloadPress}
                        >
                            {translate('project_download_report')}
                        </SubmitButton>
                    )}
                    {canSubmit && dateLimit && (
                        <SubmitButton loading={saving} onPress={onSendPress}>
                            {translate('login_send')}
                        </SubmitButton>
                    )}
                </ModalContainer>
            )}
        </Modal>
    );
}

ReportModal.propTypes = {
    canSubmit: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    phaseId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
};
