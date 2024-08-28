import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link } from '@inertiajs/react';

export default function Info({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Info" />

            <div className="h-full w-full flex flex-col px-6 space-y-6 text-lg leading-relaxed text-gray-800 dark:text-gray-200">

                <p>Notre association est fière de compter déjà plus de 50 000 adhérents, et notre communauté ne cesse de croître chaque jour !</p>

                <p>Pour continuer à suivre cette dynamique et répondre aux besoins grandissants, nous avons besoin de toujours plus de bénévoles motivés et engagés.</p>

                <p>Depuis 50 ans, notre aventure continue grâce à la générosité de 500 bénévoles passionnés : des cuisiniers talentueux, des routiers dévoués, des professeurs inspirants, et bien d'autres encore.</p>

                <p>Chaque jour, nous travaillons ensemble pour apporter un sourire à ceux qui en ont le plus besoin, en fournissant de la nourriture qui aurait autrement été gaspillée à des personnes en situation de précarité.</p>

                <p>En rejoignant notre équipe de bénévoles, vous participerez activement à cette mission de solidarité et de générosité. Votre aide est essentielle pour que nous puissions continuer à soutenir les sans-abris et les personnes en difficulté financière.</p>

                <p>Cliquez sur le bouton ci-dessous pour remplir le formulaire de candidature et devenir bénévole. Votre engagement peut faire toute la différence dans la vie de ceux qui ont besoin de nous.</p>

                <div className="flex justify-center mt-10">
                    <Link
                        href={route('candidature.create')}
                        className="text-center text-white border-4 border-white p-3 rounded-lg transition-all duration-300 hover:bg-white hover:text-black"
                        style={{backgroundColor: 'inherit'}}
                    >
                        Remplir le formulaire de candidature
                    </Link>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}



