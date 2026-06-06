"use client";
import { MemberFormModal } from "@/components/formModel/AboutFormModal";
import { TeamFormModalProps } from "@/lib/types/GlobalTypes";



export const TeamFormModal = ({ isOpen, onClose, onSuccess, member }: TeamFormModalProps) => {
    return (
        <MemberFormModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={onSuccess}
            member={member}
            apiEndpoint="team"          // API route: /team
            entityName="Team Member"    // Title: "Add Team Member"
        />
    );
};