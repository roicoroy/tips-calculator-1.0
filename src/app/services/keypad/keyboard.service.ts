import { Injectable, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';

// import { BackendExceptionLogService } from '../../ExceptionLog/backendLogging.service';

import { Keyboard, KeyboardInfo } from '@capacitor/keyboard';
import { IKeyboardService } from './IKeyboard';
import { UpdateKeyboardStatus } from 'src/app/store/keyboard/keyboard.actions';
import { blurActiveElement } from './ui-utils';

/** EquateMobile Keyboard service used to connect with native plugin. */
@Injectable({
    providedIn: 'root'
})
export class KeyboardService implements IKeyboardService {
    @Output() keyboardWillShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardDidShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardWillHide = new EventEmitter<void>();

    @Output() keyboardDidHide = new EventEmitter<void>();

    constructor(
        private readonly store: Store,
        // private readonly backendExceptionLogService: BackendExceptionLogService
    ) {

    }

    initKeyboardListeners() {
        console.log('Keyboard Plugin Events');
        // Keyboard Plugin Events
        Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
            this.keyboardWillShow.emit(info);
            this.store.dispatch(new UpdateKeyboardStatus(true));
            console.log('UpdateKeyboardStatus', true);
        });

        Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
            this.keyboardDidShow.emit(info);
            // console.log(info);
        });

        Keyboard.addListener('keyboardWillHide', () => {
            this.keyboardWillHide.emit();
            this.store.dispatch(new UpdateKeyboardStatus(false));
            console.log('UpdateKeyboardStatus', false);
        });

        Keyboard.addListener('keyboardDidHide', () => {
            blurActiveElement();
            this.keyboardDidHide.emit();
            // console.log(true);
        });
    }
    /** Set whether the accessory bar should be visible on the keyboard. */
    async setAccessoryBarVisible(isBarVisible: boolean): Promise<void> {
        try {
            return await Keyboard.setAccessoryBarVisible({ isVisible: isBarVisible });
        } catch (error) {
            // this.backendExceptionLogService.logNativeExceptionEntry(error);
            throw error;
        }
    }

    /** Hide the keyboard. */
    async hideKeyboard(): Promise<void> {
        try {
            return await Keyboard.hide();
        } catch (error) {
            // this.backendExceptionLogService.logNativeExceptionEntry(error);
            throw error;
        }
    }

    /** Display the keyboard. */
    async showKeyboard(): Promise<void> {
        try {
            return await Keyboard.show();
        } catch (error) {
            // this.backendExceptionLogService.logNativeExceptionEntry(error);
            throw error;
        }
    }

    /**
     * Enable or disable the webview scroll.
     * @param options is disabled scroll.
     */
    async setScroll(options: { isDisabled: boolean }): Promise<void> {
        try {
            return await Keyboard.setScroll(options);
        } catch (error) {
            // this.backendExceptionLogService.logNativeExceptionEntry(error);
            throw error;
        }
    }
}
