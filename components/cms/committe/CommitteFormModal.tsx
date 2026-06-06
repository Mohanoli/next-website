"use client";
import { MemberFormModal } from "@/components/formModel/AboutFormModal";
import { CommitteFormModalProps } from "@/lib/types/GlobalTypes";


export const CommitteFormModal = ({ isOpen, onClose, onSuccess, member }: CommitteFormModalProps) => {
    return (
        <MemberFormModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={onSuccess}
            member={member}
            apiEndpoint="committe"           // API route: /committees
            entityName="Committee Member"   // Title: "Add Committee Member"
        />
    );
};