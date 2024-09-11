import { StyledDeleteModal, StyledContainerRow, StyledText } from "./deleteModal.style";
import { StyledContainerColumn } from "../modals.style";
import Button from "../../button/Button";

interface DeleteModalProps {
    open: boolean;
    onCancel: () => void;
    onDelete: () => void;
    title: string;
    text?: string;
    width?: number;
}

const DeleteModal = ({ open, onCancel, onDelete, title, text, width = 480 }: DeleteModalProps) => {
    // TODO: handle dark mode

    return (
        <StyledDeleteModal
            title={title}
            open={open}
            centered
            closable={false}
            footer={null}
            onCancel={onCancel}
            width={width}
        >
            <StyledContainerColumn>
                <StyledText>{text}</StyledText>
                <StyledContainerRow>
                    <Button category="destructive" buttonFunction={onDelete} width={200}>
                        Delete
                    </Button>
                    <Button category="secondary" buttonFunction={onCancel} width={200}>
                        Cancel
                    </Button>
                </StyledContainerRow>
            </StyledContainerColumn>
        </StyledDeleteModal>
    );
};

export default DeleteModal;
