"use client";

import { BodFormModal } from "./BodFormModal";
import { MemberTable } from "@/components/table/MemberTable";

export const BodTable = () => {
    return (
        <MemberTable
            title="Board of Directors"
            description="Manage board members and their details."
            apiEndpoint="bod"          // GET /bod
            deleteEndpoint="bod"       // DELETE /bod/:id
            ModalComponent={BodFormModal}
        />
    );
};