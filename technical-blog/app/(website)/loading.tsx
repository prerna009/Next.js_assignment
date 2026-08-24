export default function Loading() {
    return (
        <main
            className="flex min-h-[60vh] items-center justify-center"
            aria-label="Loading"
        >
            <div className="text-center">
                <div
                    className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"
                    aria-hidden="true"
                />

                <p className="text-gray-600">
                    Loading...
                </p>
            </div>
        </main>
    );
}