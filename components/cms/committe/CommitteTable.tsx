"use client";

import { CommitteFormModal } from "./CommitteFormModal";
import { MemberTable } from "@/components/table/MemberTable";

export const CommitteTable = () => {
    return (
        <MemberTable
            title="Committees"
            description="Manage committee members and their details."
            apiEndpoint="committe"          // GET /committees
            deleteEndpoint="committe"       // DELETE /committees/:id
            ModalComponent={CommitteFormModal}
        />
    );
};