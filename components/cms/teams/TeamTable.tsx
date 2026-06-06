"use client";

import { TeamFormModal } from "./TeamFormModal";
import { MemberTable } from "@/components/table/MemberTable";

export const TeamTable = () => {
    return (
        <MemberTable
            title="Team Members"
            description="Manage team members and their details."
            apiEndpoint="team"         // GET /team
            deleteEndpoint="teams"     // DELETE /teams/:id (Based on your original code)
            ModalComponent={TeamFormModal}
        />
    );
};