import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import usePlayerStore from "../store/usePlayerStore";
import TrackCard from "../components/ui/TrackCard";
import Button from "../components/ui/Button";

export default function Album() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { album, loading, error } = useAlbum(id);
    const play = usePlayerStore((s) => s.play);

    const albumTracks = useMemo(() => album?.tracks || [], [album?.tracks]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-600"></div>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div className="space-y-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 transition hover:text-white"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8">
                    <p className="text-rose-400">
                        Album not found or failed to load.
                    </p>
                </div>
            </div>
        );
    }

    const releaseYear = album.release_date
        ? new Date(album.release_date).getFullYear()
        : "N/A";

    return (
        <div className="space-y-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 transition hover:text-white"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back
            </button>

            {/* Album Header */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-700">
                {/* Banner Background */}
                <div className="relative h-64 w-full bg-gradient-to-br from-orange-600 to-red-600">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                </div>

                {/* Album Info Overlay */}
                <div className="relative -mt-24 space-y-6 px-8 pb-8">
                    {/* Album Cover */}
                    <div className="flex items-end gap-6">
                        <div className="flex h-48 w-48 items-center justify-center rounded-2xl border-4 border-slate-950 bg-gradient-to-br from-orange-600 to-red-600 shadow-2xl shadow-black/50">
                            <svg
                                className="h-24 w-24 text-white/70"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        {/* Album Details */}
                        <div className="flex-1 pb-4">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/50 bg-indigo-500/10 px-4 py-1">
                                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                                    Album
                                </span>
                            </div>
                            <h1 className="text-5xl font-bold text-white">
                                {album.name}
                            </h1>
                            {album.artist && (
                                <p className="mt-4 text-xl text-slate-300">
                                    by {album.artist}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Album Stats & Actions */}
                    <div className="flex flex-wrap items-center gap-6 border-t border-slate-800 pt-6">
                        <div>
                            <p className="text-sm text-slate-400">
                                Release Year
                            </p>
                            <p className="text-3xl font-bold text-white">
                                {releaseYear}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">Tracks</p>
                            <p className="text-3xl font-bold text-white">
                                {albumTracks.length}
                            </p>
                        </div>

                        <div className="ml-auto flex gap-3">
                            <Button
                                onClick={() => {
                                    if (albumTracks.length > 0) {
                                        play(albumTracks[0]);
                                    }
                                }}
                                className="transition duration-300 hover:from-indigo-600 hover:to-purple-600"
                            >
                                Play Album
                            </Button>
                            <button className="rounded-full border border-slate-700 bg-slate-900/50 p-3 transition hover:border-indigo-500 hover:bg-slate-800">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Album Tracks Section */}
            {albumTracks.length > 0 && (
                <section className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Tracklist
                        </h2>
                        <p className="mt-2 text-slate-400">
                            {albumTracks.length} songs
                        </p>
                    </div>

                    <div className="space-y-3">
                        {albumTracks.map((track, index) => (
                            <div
                                key={track.id}
                                className="group flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950 p-4 transition hover:border-indigo-500 hover:bg-slate-900"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-slate-400">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white group-hover:text-indigo-400">
                                        {track.title}
                                    </h4>
                                    <p className="text-sm text-slate-400">
                                        {track.artist}
                                    </p>
                                </div>
                                <button
                                    onClick={() => play(track)}
                                    className="rounded-full border border-indigo-600 bg-indigo-600/10 p-2 transition hover:bg-indigo-600/20"
                                >
                                    <svg
                                        className="h-5 w-5 text-indigo-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {albumTracks.length === 0 && (
                <div className="rounded-2xl border border-slate-700 bg-slate-950 p-12 text-center">
                    <p className="text-slate-400">
                        No tracks available for this album
                    </p>
                </div>
            )}
        </div>
    );
}
