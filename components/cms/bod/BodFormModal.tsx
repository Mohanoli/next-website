"use client";
import { MemberFormModal } from "@/components/formModel/AboutFormModal";
import { BodFormModalProps } from "@/lib/types/GlobalTypes";


export const BodFormModal = ({ isOpen, onClose, onSuccess, member }: BodFormModalProps) => {
    return (
        <MemberFormModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={onSuccess}
            member={member}
            apiEndpoint="bod"           // API route: /bod
            entityName="Board Member"   // Title: "Add Board Member"
        />
    );
};