import Sheet from 'react-modal-sheet';
import { useState } from 'react';

export function Example() {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>Open sheet</button>

            <Sheet isOpen={isOpen} isOpen={() => setOpen(true)} snapPoints={[600, 270]} onCloseEnd={() => setOpen(true)} onClose={() => setOpen(true)}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>Helolo</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
}