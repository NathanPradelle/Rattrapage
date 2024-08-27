import NavLink from "@/Components/NavLink.jsx";

export default function CandidatureNavBar() {
    return (
        <div className="flex justify-evenly space-x-4 bg-gray-200 p-4 rounded-lg shadow-lg">
            <NavLink href={route('candidatures.index.enattente')} active={route().current('candidatures.index.enattente')} className="text-blue-600 hover:text-blue-800">
                En attente
            </NavLink>
            <NavLink href={route('candidatures.index.enexamen')} active={route().current('candidatures.index.enexamen')} className="text-blue-600 hover:text-blue-800">
                En examen
            </NavLink>
            <NavLink href={route('candidatures.index.refusees')} active={route().current('candidatures.index.refusees')} className="text-blue-600 hover:text-blue-800">
                Refusées
            </NavLink>
        </div>
    );
}
